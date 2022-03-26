namespace wavecloud.Data.Models;

public class Track
{
    [Key]
    public int Id { get; set; }

    public string? trackName { get; set; }
    
    public DateTime UploadDate { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    [JsonIgnore]
    public virtual User User { get; set; }
}