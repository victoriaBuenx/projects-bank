using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ResidenceService.Api.Domain.entities;

public class Project{
  public Guid id {get; set;}
  [ForeignKey("Companie")]
  public Guid idCompanie {get; set;}
  public string nombreProyecto {get; set;} = string.Empty;
  public string descripcion {get; set;} = string.Empty;
  public string carreras {get; set;} = string.Empty;
  public DateTime fechaSolicitud {get; set;} = DateTime.Now;
  public string periodo {get; set;} = string.Empty;
  public string plazosEntrega {get; set;} = string.Empty;
  public string modalidad {get; set;} = string.Empty;
  public string tipoProyecto {get; set;} = string.Empty;
  public bool apoyoEconomico {get; set;} = false;
  public string montoApoyo {get; set;} = string.Empty;
  public int numeroEstudiantes {get; set;} = 1;
  public string status {get; set;} = string.Empty;
  public string tecnologias {get; set;} = string.Empty;

  [JsonIgnore]
  public Companie Companie { get; set; } = null!;
  public ICollection<ProjectAssignment> Assignments { get; set; } = new List<ProjectAssignment>();
}