using System;
using System.Collections.Generic;

#nullable disable

namespace FiservReactApp.Models
{
    public partial class Quote
    {
        public Quote()
        {
            Scores = new HashSet<Score>();
        }

        public int QuoteId { get; set; }
        public string Author { get; set; }
        public string Quote1 { get; set; }

        public virtual ICollection<Score> Scores { get; set; }
    }
}
