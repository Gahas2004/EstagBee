from app.model.Application import Application
from app.model.dto.ApplicationDto import ApplicationDto
from app.repository.ApplicationRepository import ApplicationRepository


class ApplicationService:

    def __init__(self):
        self.application_repository = ApplicationRepository()

    def apply_resume_to_job_id(self, application_dto: ApplicationDto):
        entity: Application = self._create_application_entity(application_dto)
        self.application_repository.insert(entity)

    def retrieve_all_applicants_from_application(self, job_id: int):
        applications = self.application_repository.get_all_by_job_id(job_id)
        return applications

    def _create_application_entity(self, application_dto: ApplicationDto):
        return Application(job_id=application_dto.job_id,
                           resume_id=application_dto.resume_id)
