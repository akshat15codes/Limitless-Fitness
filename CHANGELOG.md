# Changelog

Notable project changes are recorded here.

## Unreleased

### Added

- Complete GitHub `README.md`
- Academic project report
- Installation and troubleshooting guide
- Feature-status documentation
- Architecture and data-flow documentation
- Complete REST API reference
- MySQL database documentation
- User and admin guides
- Testing and deployment guides
- VS Code-to-GitHub push guide
- File-by-file repository reference
- Security and contribution policies
- Python `requirements.txt`
- Cross-platform JavaScript syntax validator and npm check scripts

### Changed

- Replaced the real-looking password in `.env.example` with safe placeholders.
- Expanded `.env.example` to include application, AI, Python, payment, and email settings.
- Replaced the incompatible PostgreSQL-style SQL script with a schema matching the active MySQL server.
- Made the Python executable configurable through `PYTHON_BIN`.
- Made the Python agent start from the project directory.
- Updated package metadata to use the Limitless Fitness name.
- Rewrote the AI workflow document to match both current chat routes.

### Fixed

- Replaced the missing password-recovery call with a clear unavailable response that leaves credentials unchanged.
- Removed the reset page's unverified browser-storage fallback; verified recovery remains future work.
- Made authentication redirects work at both a domain root and repository subpath.
- Replaced the hard-coded localhost contact URL with the current-origin API path.
- Added missing login request validation before string operations.

### Security

- Removed a credential-like value from the committed environment template.
- Documented current authentication, admin authorization, payment, CSRF, rate-limit, and privacy limitations.

## 1.0.0

- Initial multi-page Limitless Fitness development prototype.
