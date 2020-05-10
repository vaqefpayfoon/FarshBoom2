using System.Threading.Tasks;
using FarshBoom.Models;

namespace FarshBoom.Generic
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
         Task<User> GetUser(int id);
    }
}