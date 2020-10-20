export class Client
{
    UserID? : string;
    Name? : string;
    Surname? : string;
    PhoneNo? : string;
    Email? : string;
    PassportNo? : string;
    Nationality? : string;
    DOB? : Date;
    IsStudent? : boolean;
    Residental? :string;
    Postal? : string;
    Employer? : string;
    Occupation? : string;
    WorkAddress? : string;
    WorkTel? : string;
    GrossSalary? : string;

constructor(UserID?,Name?,Surname?,PhoneNo?,Email?,PassportNo?,Nationality?,DOB?,IsStudent?,Residental?,Postal?,
    Employer?,Occupation?,WorkAddress?,WorkTel?,GrossSalary?)
{
this.UserID = UserID
 this.Name = Name;
 this.Surname = Surname;
 this.PhoneNo = PhoneNo;
 this.Email = Email;
 this.PassportNo = PassportNo;
 this.Nationality = Nationality;
 this.DOB = DOB;
 this.IsStudent = IsStudent;
 this.Residental = Residental;
 this.Postal = Postal;
 this.Employer = Employer;
 this.Occupation = Occupation;
 this.WorkAddress = WorkAddress;
 this.WorkTel = WorkTel;
 this.GrossSalary = GrossSalary;
}
}