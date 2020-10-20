export class Complaint
{
    UserID? : number;
    RentalID? : number;
    ComplaintID? : number;
    Details? : string;
    Photo? : string;


constructor(UserID?,RentalID? ,ComplaintID? ,Details?,Photo?)
{
 this.UserID = UserID;
 this.RentalID = RentalID;
 this.ComplaintID = ComplaintID;
 this.Details = Details;
 this.Photo = Photo;

}

}