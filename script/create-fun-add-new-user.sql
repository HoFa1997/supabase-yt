-- Function to handle new user insertion
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserting new user data into the public.Users table
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users table to activate handle_new_user function
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Command to Drop a Trigger
-- Syntax: DROP TRIGGER trigger_name ON table_name;
-- Usage: Removes a specified trigger from a table.
-- Example: DROP TRIGGER on_auth_user_created ON auth.users;
-- Removes the trigger named on_auth_user_created from the auth.users table.
DROP TRIGGER on_auth_user_created ON auth.users;

-- Command to Drop a Function
-- Syntax: DROP FUNCTION function_name([parameter_types]);
-- Usage: Deletes a specified function from the database.
-- Example: DROP FUNCTION public.handle_new_user();
-- Deletes the function public.handle_new_user().
DROP FUNCTION public.handle_new_user();
