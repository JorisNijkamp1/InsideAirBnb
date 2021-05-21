using System.Threading.Tasks;
using InsideAirBnb.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnb.Controllers
{
    [Route("api")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterRepository _registerRepository;
        
        public RegisterController(IRegisterRepository registerRepository)
        {
            _registerRepository = registerRepository;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<string>> RegisterUser(User user)
        {
            return await _registerRepository.RegisterUser(user);
        }
    }
}