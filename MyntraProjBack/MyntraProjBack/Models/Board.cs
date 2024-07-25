namespace MyntraProjBack.Models
{
    public class Board
    {
        public int BoardID { get; set; }
        public string BoardName { get; set; }
        public int IsEdit { get; set; }

        public int Likes { get; set; }
    }
}
