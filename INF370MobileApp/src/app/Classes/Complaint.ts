export class Complaint
{
    
    RentalID? : number;
    ComplaintID? : number;
    Details? : string;
    Photo? : string;
    ClientID? : number;
    ComplaintStatus? : string;
    Date? : Date;
    Feedback? : string;

constructor(ClientID?,RentalID? ,ComplaintID? ,Details?,Photo?,Date?,ComplaintStatus?,Feedback?)
{
 
 this.RentalID = RentalID;
 this.ComplaintID = ComplaintID;
 this.Details = Details;
 this.Photo = Photo;
 this.ClientID = ClientID;
 this.Date = Date;
 this.ComplaintStatus = ComplaintStatus;
 this.Feedback = Feedback;


}

}