# Security policy

This repository is a starter, not a security certification. Do not report real production vulnerabilities here unless your organization has adopted this repository.

Before production use:

- replace mock authentication with your OIDC/SAML identity provider;
- enforce authorization in server handlers and services;
- use an append-only audit sink;
- configure CSP with nonces and an explicit allow-list;
- move secrets to a managed secret store;
- enable dependency, SAST, container and IaC scanning;
- define incident reporting and patch SLAs;
- complete a threat model and security review.

See `docs/SECURITY.md` for the detailed checklist.
