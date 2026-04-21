namespace ResidenceService.Api.Application.dtos.companies;

public class CreateCompanieDto{
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
}
