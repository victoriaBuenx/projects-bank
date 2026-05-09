CREATE USER sym_user WITH PASSWORD 'sym_password';
ALTER USER sym_user WITH SUPERUSER; -- Required initially by SymmetricDS to create triggers, functions, etc.
