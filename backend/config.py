from pydantic_settings import (
    BaseSettings,
    EnvSettingsSource,
    PydanticBaseSettingsSource
)
from pydantic.fields import FieldInfo
from typing import Any, List, Tuple, Type


class EnvironmentSettingsSource(EnvSettingsSource):
    def prepare_field_value(
        self,
        field_name: str,
        field: FieldInfo,
        value: Any,
        value_is_complex: bool
    ) -> Any:
        if field.annotation == List[str]:
            return value.split()

        return super().prepare_field_value(
            field_name, field, value, value_is_complex
        )


class Settings(BaseSettings, case_sensitive=True):
    ALLOWED_HOSTS: List[str]
    CORS_ALLOW_ORIGIN_REGEX: str
    OLLAMA_HOST: str

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: Type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> Tuple[PydanticBaseSettingsSource, ...]:
        return (EnvironmentSettingsSource(settings_cls),)


settings = Settings()
