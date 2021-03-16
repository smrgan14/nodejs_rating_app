UPDATE 
    Users
SET 
    FirstName = @FirstName,
    LastName = @LastName,
    Email = @Email,
    RefreshToken = @RefreshToken
 WHERE 
    UserId = @UserId
