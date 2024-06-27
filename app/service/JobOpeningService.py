from typing import List, Tuple

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
        jobs: List[Tuple] = self.job_opening_repository.get_all()
        entity_list: List = self._parse_tuples_to_dto(jobs)
        return entity_list

    def get_job_by_id(self, job_id: int):
        job = self.job_opening_repository.get_by_id(job_id)
        return self._parse_job_tuple_to_dto(job)

    def _parse_tuples_to_dto(self, jobs_tuples) -> List:
        dtos = []
        for tpl in jobs_tuples:
            dto = self._parse_job_tuple_to_dto(tpl)
            dtos.append(dto)
        return dtos

    def delete_job(self, job_id: int):
        self.job_opening_repository.delete_one(job_id)


    def _parse_job_tuple_to_dto(self, tpl):
        dto = JobOpeningDto(
            job_id=tpl[0],
            description=tpl[1],
            job_name=tpl[4],
            company_id=tpl[3],
            company_name=tpl[2]
        )

        return dto