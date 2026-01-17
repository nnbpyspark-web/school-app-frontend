# Project Implementation Instructions

## Guidelines for Developers & AI Agents

1. **Completeness**: Don't miss any implementation details. Ensure every requirement in the roadmap or prompt is addressed.

2. **Verification**: After implementing any feature, immediately recheck whether it is implemented correctly and working as expected. If not, investigate and solve the issue before moving forward.

3. **Database Changes**: If a feature requires creating a Supabase table or executing SQL commands, provide the exact SQL query to execute.

4. **Security & Credentials**: 
   - Always use credentials from the `.env` file. 
   - Never hardcode secrets.
   - If specific credentials are missing, explicitly ask the user for them.

5. **Database Integrity**: 
   - While implementing, verify the database connection.
   - Double-check SQL queries for correctness.
   - If modifications to the schema or queries are needed after initial implementation, clearly communicate these changes.
