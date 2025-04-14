using backend_challenge_spedy.Models;
using backend_challenge_spedy.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ClassificadosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClassificadosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/classificados
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Classificado>>> GetClassificados()
    {
        var classificados = await _context.Classificados
            .Include(c => c.Tags)
            .OrderByDescending(c => c.Data)
            .ToListAsync();

        return Ok(classificados);
    }

    // POST: api/classificados
    [HttpPost]
    public async Task<ActionResult<Classificado>> CreateClassificado(ClassificadoDto dto)
    {
        // Buscar ou criar as tags
        var tags = new List<Tag>();
        foreach (var tagName in dto.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Nome == tagName);
            if (tag == null)
            {
                tag = new Tag { Nome = tagName };
                _context.Tags.Add(tag);
            }
            tags.Add(tag);
        }

        var classificado = new Classificado
        {
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            Tags = tags
        };

        _context.Classificados.Add(classificado);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetClassificados), new { id = classificado.Id }, classificado);
    }

    // GET: api/classificados/buscar?termo=palavra
    [HttpGet("buscar")]
    public async Task<ActionResult<IEnumerable<Classificado>>> BuscarPorTermo([FromQuery] string termo)
    {
        if (string.IsNullOrWhiteSpace(termo))
            return BadRequest("O parâmetro 'termo' é obrigatório.");

        var termoLower = termo.ToLower();

        var resultados = await _context.Classificados
            .Include(c => c.Tags)
            .Where(c =>
                c.Titulo!.ToLower().Contains(termoLower) ||
                c.Descricao!.ToLower().Contains(termoLower))
            .OrderByDescending(c => c.Data)
            .ToListAsync();

        return Ok(resultados);
    }

    // GET: api/classificados/por-tag?nome=Tag1
    [HttpGet("por-tag")]
    public async Task<ActionResult<IEnumerable<Classificado>>> GetClassificadosPorTag([FromQuery] string nome)
    {
        var classificados = await _context.Classificados
            .Include(c => c.Tags)
            .Where(c => c.Tags.Any(t => t.Nome == nome))
            .OrderByDescending(c => c.Data)
            .ToListAsync();

        return Ok(classificados);
    }


    // GET: api/classificados/tag
    [HttpGet("/api/tags")]
    public async Task<ActionResult<IEnumerable<string>>> GetTags()
    {
        var tags = await _context.Tags
            .Select(t => t.Nome)
            .ToListAsync();

        return Ok(tags);
    }

}
