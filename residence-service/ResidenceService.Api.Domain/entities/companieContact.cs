using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ResidenceService.Api.Domain.entities;

public class CompanieContact{
  public Guid id {get; set;}
  [ForeignKey("Companie")]
  public Guid idCompanie {get; set;}
  public string nombre {get; set;} = string.Empty;
  public string apellidoPaterno {get; set;} = string.Empty;
  public string apellidoMaterno {get; set;} = string.Empty;
  public string puesto {get; set;} = string.Empty;
  public string telefono {get; set;} = string.Empty;
  public string correo {get; set;} = string.Empty;
  public string horarioAtencion {get; set;} = string.Empty;
  public string notasAdicionales {get; set;} = string.Empty;

  [JsonIgnore]
  public Companie Companie { get; set; } = null!;
}