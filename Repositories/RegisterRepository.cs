using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnb.Repositories
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly AirBNBContext _context;

        public RegisterRepository(AirBNBContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<string>> RegisterUser(User user)
        {
            user.Role = "user";
            
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user.Username;
        }
    }
}