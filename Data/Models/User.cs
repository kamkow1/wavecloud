namespace wavecloud.Data.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    
    public string? Username { get; set; }
    
    public string? Password { get; set; }
    
    public string? Email { get; set; }

    public DateTime JoinedAt { get; set; }

    public virtual ICollection<Track> Tracks { get; set; }
}