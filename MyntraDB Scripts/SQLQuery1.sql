CREATE TABLE BoardItems (
    BoardItemID INT IDENTITY(1,1) PRIMARY KEY,
    BoardID INT FOREIGN KEY REFERENCES Boards(BoardID),
    ItemID INT FOREIGN KEY REFERENCES Items(ItemID)
);

CREATE TABLE Items (
    ItemID INT IDENTITY(1,1) PRIMARY KEY,
    ItemName NVARCHAR(100),
    ItemType NVARCHAR(50),
    ItemData NVARCHAR(MAX)
);

CREATE TABLE Boards (
    BoardID INT IDENTITY(1,1) PRIMARY KEY,
    BoardName NVARCHAR(100),
    isEdit INT
);


INSERT INTO Boards (BoardName, isEdit) VALUES ('Board 1', 0);
INSERT INTO Boards (BoardName, isEdit) VALUES ('Board 2', 0);


INSERT INTO Items (ItemName, ItemType, ItemData) VALUES ('Item 1', 'Type A', 'Data for Item 1');
INSERT INTO Items (ItemName, ItemType, ItemData) VALUES ('Item 2', 'Type B', 'Data for Item 2');
INSERT INTO Items (ItemName, ItemType, ItemData) VALUES ('Item 3', 'Type A', 'Data for Item 3');
INSERT INTO Items (ItemName, ItemType, ItemData) VALUES ('Item 4', 'Type C', 'Data for Item 4');
INSERT INTO Items (ItemName, ItemType, ItemData) VALUES ('Item 5', 'Type B', 'Data for Item 5');

-- Link Items 1 and 2 to Board 1
INSERT INTO BoardItems (BoardID, ItemID) VALUES (1, 1);
INSERT INTO BoardItems (BoardID, ItemID) VALUES (1, 2);

-- Link Items 3 and 4 to Board 2
INSERT INTO BoardItems (BoardID, ItemID) VALUES (2, 3);
INSERT INTO BoardItems (BoardID, ItemID) VALUES (2, 4);


select * from Boards
select * from items
select * from boarditems

SELECT i.ItemID, i.ItemName, i.ItemType, i.ItemData
FROM Items i
INNER JOIN BoardItems bi ON i.ItemID = bi.ItemID
WHERE bi.BoardID = 2;



CREATE OR ALTER PROCEDURE AddItemsToBoard
    @BoardID INT = 1,
    @ItemIDs NVARCHAR(MAX) = '1,2'
AS
BEGIN
    DECLARE @ItemID INT;
    DECLARE @Pos INT;
    DECLARE @ItemIDStr NVARCHAR(50);
    
    -- Remove any surrounding spaces and split the ItemIDs
    SET @ItemIDs = LTRIM(RTRIM(@ItemIDs)) + ',';
    
    -- Loop through each ItemID in the comma-separated list
    WHILE CHARINDEX(',', @ItemIDs) > 0
    BEGIN
        -- Extract the ItemID
        SET @Pos = CHARINDEX(',', @ItemIDs);
        SET @ItemIDStr = LEFT(@ItemIDs, @Pos - 1);
        SET @ItemID = CAST(@ItemIDStr AS INT);
        
        -- Insert into BoardItems table
        INSERT INTO BoardItems (BoardID, ItemID) VALUES (@BoardID, @ItemID);
        
        -- Remove the processed ItemID from the list
        SET @ItemIDs = RIGHT(@ItemIDs, LEN(@ItemIDs) - @Pos);
    END
END
GO


CREATE OR ALTER PROCEDURE DeleteItemsFromBoard
    @BoardID INT = 1,
    @ItemIDs NVARCHAR(MAX) = '1,2'
AS
BEGIN
    DECLARE @ItemID INT;
    DECLARE @Pos INT;
    DECLARE @ItemIDStr NVARCHAR(50);
    
    -- Remove any surrounding spaces and split the ItemIDs
    SET @ItemIDs = LTRIM(RTRIM(@ItemIDs)) + ',';
    
    -- Loop through each ItemID in the comma-separated list
    WHILE CHARINDEX(',', @ItemIDs) > 0
    BEGIN
        -- Extract the ItemID
        SET @Pos = CHARINDEX(',', @ItemIDs);
        SET @ItemIDStr = LEFT(@ItemIDs, @Pos - 1);
        SET @ItemID = CAST(@ItemIDStr AS INT);
        
        -- Delete from BoardItems table
        DELETE FROM BoardItems WHERE BoardID = @BoardID AND ItemID = @ItemID;
        
        -- Remove the processed ItemID from the list
        SET @ItemIDs = RIGHT(@ItemIDs, LEN(@ItemIDs) - @Pos);
    END
END
GO







--CREATE OR ALTER PROCEDURE GetItemsForBoard
--    @BoardID INT
--AS
--BEGIN
--    SELECT i.ItemID, i.ItemName, i.ItemType, i.ItemData
--    FROM Items i
--    INNER JOIN BoardItems bi ON i.ItemID = bi.ItemID
--    WHERE bi.BoardID = @BoardID;
--END
--GO


CREATE OR ALTER PROCEDURE GetItemsForBoard
    @BoardID INT
AS
BEGIN
    SELECT DISTINCT i.ItemID, i.ItemName, i.ItemType, i.ItemData
    FROM Items i
    INNER JOIN BoardItems bi ON i.ItemID = bi.ItemID
    WHERE bi.BoardID = @BoardID;
END
GO




CREATE OR ALTER PROCEDURE DeleteItemsForBoard
    @BoardID INT
AS
BEGIN
    DELETE FROM BoardItems
    WHERE BoardID = @BoardID;
END
GO

CREATE or ALTER PROCEDURE AddBoard
    @BoardName NVARCHAR(100) = 'Board 3'
AS
BEGIN
    INSERT INTO Boards (BoardName, isEdit)
    VALUES (@BoardName, 0);
    
END
GO


select * from Boards
select * from items
select * from boarditems

--i will pass it through the input UI
EXEC AddBoard @BoardName = 'Board 3'

EXEC AddItemsToBoard @BoardID = 1, @ItemIDs = '1,2,3';

EXEC DeleteItemsFromBoard @BoardID = 1, @ItemIDs = '1';

DECLARE @BoardID INT = 1;
EXEC GetItemsForBoard @BoardID;

DECLARE @BoardID INT = 1;
EXEC DeleteItemsForBoard @BoardID;


--API's needed for frontend

--1. SP needed for retriving all itemID
--2. SP needed for retriving all BoardID
--3. SP needed for retriving all BoardNames

-- i will create a board through input box
-- i will display list of boardnames
-- checkboxes use

--export class CheckboxDynamicDemo {
--    selectedCategories: any[] = [];

--    categories: any[] = [
        --{ name: 'Accounting', key: 'A' },
        --{ name: 'Marketing', key: 'M' },
        --{ name: 'Production', key: 'P' },
        --{ name: 'Research', key: 'R' }
--    ];
--}

--export class CheckboxDynamicDemo {
--    selectedCategories: any[] = [];

--    categories: any[] = [
        --{ name: 'Accounting', key: 'A' },
        --{ name: 'Marketing', key: 'M' },
        --{ name: 'Production', key: 'P' },
        --{ name: 'Research', key: 'R' }
--    ];
--}





