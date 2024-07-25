using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MyntraProjBack.Models;
using System.Data;

namespace MyntraProjBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<HomeController> _logger;

        public HomeController(IConfiguration configuration, ILogger<HomeController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("AddBoard")]
        public async Task<IActionResult> AddBoard(string boardName)
        {
            if (string.IsNullOrEmpty(boardName))
            {
                return BadRequest("Board name is required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("AddBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardName", boardName);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Board added successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding board");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("UpdateBoardName")]
        public async Task<IActionResult> UpdateBoardName(int boardID, string newBoardName)
        {
            if (boardID <= 0 || string.IsNullOrEmpty(newBoardName))
            {
                return BadRequest("Valid Board ID and new board name are required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("UpdateBoardName", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);
                        command.Parameters.AddWithValue("@NewBoardName", newBoardName);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Board name updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating board name");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("LockBoard")]
        public async Task<IActionResult> LockBoard(int boardID)
        {
            if (boardID <= 0)
            {
                return BadRequest("Valid Board ID is required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("LockBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Board locked successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error locking board");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("DeleteBoard")]
        public async Task<IActionResult> DeleteBoard(int boardID)
        {
            if (boardID <= 0)
            {
                return BadRequest("Valid Board ID is required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("DeleteBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Board deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting board");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("GetBoards")]
        public async Task<IActionResult> GetBoards()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                var boards = new List<Board>();

                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("GetBoards", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var board = new Board
                                {
                                    BoardID = reader.GetInt32(reader.GetOrdinal("BoardID")),
                                    BoardName = reader.GetString(reader.GetOrdinal("BoardName")),
                                    IsEdit = reader.GetInt32(reader.GetOrdinal("IsEdit")),
                                    Likes = reader.GetInt32(reader.GetOrdinal("Likes"))
                                };
                                boards.Add(board);
                            }
                        }
                    }
                }

                return Ok(boards);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting boards");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("GetBoardById/{boardID}")]
        public async Task<IActionResult> GetBoardById(int boardID)
        {
            if (boardID <= 0)
            {
                return BadRequest("Valid Board ID is required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("GetBoardsById", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);

                        connection.Open();
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                var boards = new List<Board>();
                                while (await reader.ReadAsync())
                                {
                                    boards.Add(new Board
                                    {
                                        BoardID = reader.GetInt32(reader.GetOrdinal("BoardID")),
                                        BoardName = reader.GetString(reader.GetOrdinal("BoardName")),
                                        IsEdit = reader.GetInt32(reader.GetOrdinal("IsEdit")),
                                        Likes = reader.GetInt32(reader.GetOrdinal("Likes"))
                                    });
                                }
                                return Ok(boards);
                            }
                            else
                            {
                                return NotFound("Board not found.");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting board by ID");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("AddProductsToBoard")]
        public async Task<IActionResult> AddProductsToBoard(int boardID, string itemIDs)
        {
            if (boardID <= 0 || string.IsNullOrEmpty(itemIDs))
            {
                return BadRequest("Valid Board ID and Item IDs are required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("AddItemsToBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);
                        command.Parameters.AddWithValue("@ItemIDs", itemIDs);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Items added to board successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding items to board");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("DeleteProductsFromBoard")]
        public async Task<IActionResult> DeleteProductsFromBoard(int boardID, string itemIDs)
        {
            if (boardID <= 0 || string.IsNullOrEmpty(itemIDs))
            {
                return BadRequest("Valid Board ID and Item IDs are required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("DeleteItemsFromBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);
                        command.Parameters.AddWithValue("@ItemIDs", itemIDs);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Items deleted from board successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting items from board");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("GetProductsForBoard/{boardID}")]
        public async Task<IActionResult> GetProductsForBoard([FromRoute] int boardID)
        {
            if (boardID <= 0)
            {
                return BadRequest("Valid Board ID is required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                var items = new List<Item>();

                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("GetItemsForBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);

                        connection.Open();
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var item = new Item
                                {
                                    ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                    ItemName = reader.GetString(reader.GetOrdinal("ItemName")),
                                    ItemType = reader.GetString(reader.GetOrdinal("ItemType")),
                                    ItemData = reader.GetString(reader.GetOrdinal("ItemData")),
                                    Imglink = reader.GetString(reader.GetOrdinal("Imglink"))
                                };
                                items.Add(item);
                            }
                        }
                    }
                }

                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting items for board");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("ResetProductsInBoard")]
        public async Task<IActionResult> ResetProductsInBoard(int boardID)
        {
            if (boardID <= 0)
            {
                return BadRequest("Valid Board ID is required.");
            }

            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("DeleteItemsForBoard", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BoardID", boardID);

                        connection.Open();
                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Items deleted from board successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting items for board");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("MyntraProj");
                var items = new List<Item>();

                using (var connection = new SqlConnection(connectionString))
                {
                    using (var command = new SqlCommand("GetItems", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var item = new Item
                                {
                                    ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                    ItemName = reader.GetString(reader.GetOrdinal("ItemName")),
                                    ItemType = reader.GetString(reader.GetOrdinal("ItemType")),
                                    ItemData = reader.GetString(reader.GetOrdinal("ItemData")),
                                    Imglink = reader.GetString(reader.GetOrdinal("Imglink"))
                                };
                                items.Add(item);
                            }
                        }
                    }
                }

                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting items");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
