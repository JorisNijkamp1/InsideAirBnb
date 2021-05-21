using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace InsideAirBnb
{
    public partial class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
