namespace MessageApi.Models
{
    public class ContactUs
    {
        public long Id { get;set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message{get; set;}
        public string Phone { get; set; }
        public string CompanyName {get;set; }
        public string BusinessType {get; set;}
    }
}