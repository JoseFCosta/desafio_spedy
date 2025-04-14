using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend_challenge_spedy.Models
{
    public class Tag
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Nome { get; set; }

        [JsonIgnore]
        public ICollection<Classificado> Classificados { get; set; } = new List<Classificado>();
    }
}