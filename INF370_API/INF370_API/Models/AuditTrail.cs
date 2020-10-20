using INF370_API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace INF370_API
{


 


    public interface IAuditDbContext
    {
        Microsoft.EntityFrameworkCore.DbSet<tbl_test_audit_trail> Audit { get; set; }
        Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker ChangeTracker { get; }
    }
    public enum AuditType
    {
        None = 0,
        Create = 1,
        Update = 2,
        Delete = 3
    }

  

    public class AuditEntry
    {
        private DbEntityEntry entry;
        private string v;

        public EntityEntry Entry { get; }
        public AuditType AuditType { get; set; }
        public string AuditUser { get; set; }
        public string TableName { get; set; }
        public Dictionary<string, object>
               KeyValues
        { get; } = new Dictionary<string, object>();
        public Dictionary<string, object>
               OldValues
        { get; } = new Dictionary<string, object>();
        public Dictionary<string, object>
               NewValues
        { get; } = new Dictionary<string, object>();
        public List<string> ChangedColumns { get; } = new List<string>();

        public AuditEntry(EntityEntry  entry, string auditUser)
        {
            Entry = entry;
            AuditUser = "kk";
            SetChanges();
        }


        private void SetChanges()
        {
            TableName = Entry.Metadata.Name;
            foreach (PropertyEntry property in Entry.Metadata.GetProperties())
            {
                string propertyName = property.Metadata.Name;


                string dbColumnName = property.Metadata.Name.GetType().Name;
                if (property.Metadata.IsPrimaryKey())
                {
                    KeyValues[propertyName] = property.CurrentValue;
                    continue;
                }

                switch (Entry.State)
                {
                    case Microsoft.EntityFrameworkCore.EntityState.Added:
                        NewValues[propertyName] = property.CurrentValue;
                        AuditType = AuditType.Create;
                        break;

                    case Microsoft.EntityFrameworkCore.EntityState.Deleted:
                        OldValues[propertyName] = property.OriginalValue;
                        AuditType = AuditType.Delete;
                        break;

                    case Microsoft.EntityFrameworkCore.EntityState.Modified:
                        if (property.IsModified)
                        {
                            ChangedColumns.Add(dbColumnName);

                            OldValues[propertyName] = property.OriginalValue;
                            NewValues[propertyName] = property.CurrentValue;
                            AuditType = AuditType.Update;
                        }
                        break;
                }
            }
        }

        public tbl_test_audit_trail ToAudit()
        {
            var audit = new tbl_test_audit_trail();
            audit.audit_datetime_utc = DateTime.UtcNow;
            audit.audit_type = AuditType.ToString();
            audit.audit_user = AuditUser;
            audit.table_name = TableName;
            audit.key_values = JsonConvert.SerializeObject(KeyValues);
            audit.old_values = OldValues.Count == 0 ?
                              null : JsonConvert.SerializeObject(OldValues);
            audit.new_values = NewValues.Count == 0 ?
                              null : JsonConvert.SerializeObject(NewValues);
            audit.changed_columns = ChangedColumns.Count == 0 ?
                                   null : JsonConvert.SerializeObject(ChangedColumns);

            return audit;
        }
    }
}