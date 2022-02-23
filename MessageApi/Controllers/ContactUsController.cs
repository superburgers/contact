using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MessageApi.Models;

namespace MessageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly ContactUsContext _context;

        public ContactUsController(ContactUsContext context)
        {
            _context = context;
        }

        [HttpGet("messageId")]
        public async Task<ActionResult<IEnumerable<ContactUs>>> GetMessage(long id)
        {
            return await _context.ContactUsMessages
                .Select(x => x)
                .Where(x=>x.Id == id)
                .ToListAsync();
        }

        [HttpGet("customerMessages")]
        public async Task<ActionResult<IEnumerable<ContactUs>>> GetByCustomer(string customerName)
        {
            return await _context.ContactUsMessages
                .Select(x => x)
                .Where(x=>x.CompanyName == customerName)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<ContactUs>> CreateContactUsMessage(ContactUs contact)
        {
            _context.ContactUsMessages.Add(contact);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactMessage(long id)
        {
            var message = await _context.ContactUsMessages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            _context.ContactUsMessages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
