using System;
using System.Collections.Generic;

#nullable disable

namespace FiservReactApp.Models
{
    public partial class Score
    {
        public int ScoreId { get; set; }
        public string Username { get; set; }
        public int Wpm { get; set; }
        public int QuoteId { get; set; }

        public virtual Quote Quote { get; set; }
    }
}
