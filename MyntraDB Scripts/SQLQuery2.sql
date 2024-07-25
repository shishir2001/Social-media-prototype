-- SP to create a board
CREATE or ALTER PROCEDURE AddBoard
    @BoardName NVARCHAR(100) = 'Board 3'
AS
BEGIN
    INSERT INTO Boards (BoardName, isEdit)
    VALUES (@BoardName, 0);
    
END
GO

--SP to edit a board
CREATE or ALTER PROCEDURE UpdateBoardName
    @BoardID INT = 1,
    @NewBoardName NVARCHAR(100) = 'board 1'
AS
BEGIN
    UPDATE Boards
    SET BoardName = @NewBoardName
    WHERE BoardID = @BoardID;
END
GO

--SP to lock a board
CREATE OR ALTER PROCEDURE LockBoard
    @BoardID INT = 1
AS
BEGIN
    UPDATE Boards
    SET isEdit = 0
    WHERE BoardID = @BoardID;
END
GO

--SP to get all boards
CREATE PROCEDURE GetBoards
AS
BEGIN
	select * from boards
END



