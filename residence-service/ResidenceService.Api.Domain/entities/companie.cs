namespace ResidenceService.Api.Domain.entities;

public class Companie{
  public Guid id {get; set;}
  public DateTime fechaRegistro {get; set;}
  public string nombreEmpresa {get; set;} = string.Empty;
  public string descripcion {get; set;} = string.Empty;
  public string sector {get; set;} = string.Empty;
  public string rfc {get; set;} = string.Empty;
  public string cp {get; set;} = string.Empty;
  public string pais {get; set;} = string.Empty;
  public string estado {get; set;} = string.Empty;
  public string ciudad {get; set;} = string.Empty;
  public string direccion {get; set;} = string.Empty;
  public string telefono {get; set;} = string.Empty;
  public string giro {get; set;} = string.Empty;
  public string tamañoEmpresa {get; set;} = string.Empty;
  public bool convenio {get; set;}
  public int calificacion {get; set;}

  public ICollection<CompanieContact> Contacts { get; set; } = new List<CompanieContact>();
  public ICollection<Project> Projects { get; set; } = new List<Project>();
  public ICollection<CompanyRating> Ratings { get; set; } = new List<CompanyRating>();
}
