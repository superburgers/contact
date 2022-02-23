using Microsoft.EntityFrameworkCore;

namespace MessageApi.Models
{
    public class ContactUsContext : DbContext
    {
        public ContactUsContext(DbContextOptions<ContactUsContext> options)
            : base(options)
        {}

        public DbSet<ContactUs> ContactUsMessages { get; set; }
    }
}