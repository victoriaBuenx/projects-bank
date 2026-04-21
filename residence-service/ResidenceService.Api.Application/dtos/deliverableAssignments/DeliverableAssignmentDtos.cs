namespace ResidenceService.Api.Application.dtos.deliverableAssignments;

public class CreateDeliverableAssignmentDto
{
    public Guid IdDeliverable { get; set; }
    public Guid IdProjectAssignment { get; set; }
}

public class UpdateDeliverableAssignmentDto : CreateDeliverableAssignmentDto
{
    // Usually assignments don't change much, but adding for completeness
}
