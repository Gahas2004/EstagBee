from dataclasses import dataclass

from app.model.JobOpening import JobOpening
from app.model.dto.JobOpeningDto import JobOpeningDto
from app.repository.JobOpeningRepository import JobOpeningRepository


class JobOpeningService:
    def __init__(self):
        self.job_opening_repository = JobOpeningRepository()

    def create_job_opening(self, job_dto: JobOpeningDto):
        job_entity: JobOpening = self._create_job_opening_entity(job_dto)
        id: int = self.job_opening_repository.insert(job_entity)
        job_entity.job_id = id
        return job_entity

    def _create_job_opening_entity(self, job_dto: JobOpeningDto) -> JobOpening:
        entity: JobOpening = JobOpening(description=job_dto.description,
                                        company_id=job_dto.company_id,
                                        company_name=job_dto.company_name,
                                        job_name=job_dto.job_name,
                                        job_id=None)

        return entity

    def retrieve_all_job_openings(self):
        jobs = self.job_opening_repository.get_all()
        return jobs
