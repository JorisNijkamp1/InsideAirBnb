using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnb.Repositories
{
    public interface IRegisterRepository
    {
        Task<ActionResult<string>> RegisterUser(User user);
    }
}