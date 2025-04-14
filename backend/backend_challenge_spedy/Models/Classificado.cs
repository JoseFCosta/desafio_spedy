using System.ComponentModel.DataAnnotations;

namespace backend_challenge_spedy.Models
{
    public class Classificado
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string? Titulo { get; set; }

        [Required]
        [MaxLength(500)]
        public string? Descricao { get; set; }

        [Required]
        public DateTime Data { get; set; } = DateTime.UtcNow;


        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
