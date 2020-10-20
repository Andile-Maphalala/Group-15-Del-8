//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity.Core.Objects;
//using System.Data.Entity.Core.Objects.DataClasses;
//using System.IO;
//using System.Linq;
//using System.Reflection;
//using System.Runtime.Serialization;
//using System.Web;
//using System.Xml;
//using System.Xml.Linq;
//using System.Xml.Serialization;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.ChangeTracking;

//namespace INF370_API.Models
//{
//    public partial class INF370Entities
//    {
//        public string UserName { get; set; }
//        List<Audit> auditTrailList = new List<Audit>();

//        public enum AuditActions
//        {
//            I,
//            U,
//            D
//        }

//        public void OnContextCreated()
//        {
//            var oc = new ObjectContext("");
        
           
//            oc.SavingChanges += new EventHandler(AdventureWorksEntities_SavingChanges);
//        }

//        void AdventureWorksEntities_SavingChanges(object sender, EventArgs e)
//        {
//            INF370Entities db = new INF370Entities();

      

//           IEnumerable < ObjectStateEntry> changes = this.GetObjectStateEntries(EntityState.Added | EntityState.Deleted | EntityState.Modified);
//            foreach (ObjectStateEntry stateEntryEntity in changes)
//            {
//                if (!stateEntryEntity.IsRelationship &&
//                stateEntryEntity.Entity != null &&
//                !(stateEntryEntity.Entity is Audit))
//                {//is a normal entry, not a relationship
//                    Audit audit = this.AuditTrailFactory(stateEntryEntity, UserName);
//                    auditTrailList.Add(audit);
//                }
//            }

//            if (auditTrailList.Count > 0)
//            {
//                foreach (var audit in auditTrailList)
//                {//add all audits 
                   
//                    db.Audits.Add(audit);
                
//                }
//            }
//        }
//        INF370Entities db = new INF370Entities();
//        private Audit AuditTrailFactory(ObjectStateEntry entry, string UserName)
//        {
//            Audit audit = new Audit();
//            audit.Id = 1;
//            audit.Updated_Date = DateTime.Now;
//            audit.TableName = entry.EntitySet.Name;
//            audit.Updated_By = UserName;
//            switch (entry.State)
//            {
//                case EntityState.Added:
                   
//               audit.NewData = GetEntryValueInString(entry, false);
//               audit.Actions = AuditActions.I.ToString();
//                    break;

//                case EntityState.Deleted:
//                    audit.OldData = GetEntryValueInString(entry, true);
//                      audit.Actions = AuditActions.D.ToString();
//                    break;

//                case EntityState.Modified:
//                audit.OldData = GetEntryValueInString(entry, true);
//                       audit.NewData = GetEntryValueInString(entry, false);
//                       audit.Actions = AuditActions.U.ToString();

//                      IEnumerable<string> modifiedProperties = entry.GetModifiedProperties();
//                       //assing collection of mismatched Columns name as serialized string 
//                       audit.TableName = INF379_API.XMLSerializationHelper.XmlSerialize(
//                           modifiedProperties.ToArray());
//                    break;
//            }

      
//            return audit;
//        }
//        public EntityObject CloneEntity(EntityObject obj)
//        {
//            DataContractSerializer dcSer = new DataContractSerializer(obj.GetType());
//            MemoryStream memoryStream = new MemoryStream();

//            dcSer.WriteObject(memoryStream, obj);
//            memoryStream.Position = 0;

//            EntityObject newObject = (EntityObject)dcSer.ReadObject(memoryStream);
//            return newObject;
//        }
//        private string GetEntryValueInString(ObjectStateEntry entry, bool isOrginal)
//        {
//            if (entry.Entity is EntityObject)
//            {
//                object target = CloneEntity((EntityObject)entry.Entity);
//                foreach (string propName in entry.GetModifiedProperties())
//                {
//                    object setterValue = null;
//                    if (isOrginal)
//                    {
//                        //Get original value 
//                        setterValue = entry.OriginalValues[propName];
//                    }
//                    else
//                    {
//                        //Get original value 
//                        setterValue = entry.CurrentValues[propName];
//                    }
//                    //Find property to update 
//                    PropertyInfo propInfo = target.GetType().GetProperty(propName);
//                    //update property with ribald value 
//                    if (setterValue == DBNull.Value)
//                    {//
//                        setterValue = null;
//                    }
//                    propInfo.SetValue(target, setterValue, null);
//                }//end foreach

//                XmlSerializer formatter = new XmlSerializer(target.GetType());
//                XDocument document = new XDocument();

//                using (XmlWriter xmlWriter = document.CreateWriter())
//                {
//                    formatter.Serialize(xmlWriter, target);
//                }
//                return document.Root.ToString();
//            }
//            return null;
//        }
//    }
//    }
