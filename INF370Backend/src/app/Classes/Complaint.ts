export class Complaint
{
    
    RentalID? : number;
    ComplaintID? : number;
    Details? : string;
    Photo? : string;
    UserID? : number;
    ComplaintStatus? : string;
    Date? : Date;
    Feedback? : string;

constructor(UserID?,RentalID? ,ComplaintID? ,Details?,Photo?,Date?,ComplaintStatus?,Feedback?)
{
 
 this.RentalID = RentalID;
 this.ComplaintID = ComplaintID;
 this.Details = Details;
 this.Photo = Photo;
 this.UserID = UserID;
 this.Date = Date;
 this.ComplaintStatus = ComplaintStatus;
 this.Feedback = Feedback;


}

}