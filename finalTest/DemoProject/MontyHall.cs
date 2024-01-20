namespace DemoProject
{
    public class MontyHall
    {
        private int totalWins_switch = 0;
        private int totalWins_stay = 0;
        private int simulations;
        private bool switchDoor;
        private Random random = new Random();

        public MontyHall(int simulations, bool switchDoor)
        {
            this.simulations = simulations;
            this.switchDoor = switchDoor;
        }

        public void Simulate()
        {
            for (int i = 0; i < this.simulations; i++)
            {
                string[] doors = InitializeDoors();
                int initialChoice = random.Next(0, 3);
                int revealed = RevealedGoatDoor(doors, initialChoice);

                if (this.switchDoor)
                {
                    initialChoice = SwitchDoor(initialChoice, revealed);
                }

                if (IsCarBehindChosenDoor(doors, initialChoice))
                {
                    IncrementWinCount(this.switchDoor);
                }
            }
        }

        private string[] InitializeDoors()
        {
            string[] doors = { "goat", "goat", "goat" };
            int carIndex = random.Next(0, 3);
            doors[carIndex] = "car";
            return doors;
        }

        private int RevealedGoatDoor(string[] doors, int initialChoice)
        {
            int revealed;
            do
            {
                revealed = random.Next(0, 3);
            } while (revealed == initialChoice || doors[revealed] == "car");

            return revealed;
        }

        private int SwitchDoor(int initialChoice, int revealed)
        {
            return 3 - initialChoice - revealed;
        }

        private bool IsCarBehindChosenDoor(string[] doors, int chosenDoor)
        {
            return doors[chosenDoor] == "car";
        }

        private void IncrementWinCount(bool switched)
        {
            if (switched)
            {
                this.totalWins_switch++;
            }
            else
            {
                this.totalWins_stay++;
            }
        }

        public double GetSwitchWinRate()
        {
            return CalculateWinRate(this.totalWins_switch);
        }

        public double GetStayWinRate()
        {
            return CalculateWinRate(this.totalWins_stay);
        }

        private double CalculateWinRate(int totalWins)
        {
            return simulations == 0 ? 0 : (double)totalWins / simulations * 100;
        }
    }
}
