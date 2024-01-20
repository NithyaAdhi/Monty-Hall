using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Monty_HallController : ControllerBase
    {
        [HttpGet("RunSimulation/monty-hall")]
        public ActionResult RunSimulation(int simulations, bool changeDoor)
        {
            var simulation = new MontyHall(simulations, changeDoor);
            simulation.Simulate();
            return Ok(new
            {
                SwitchWinRate = simulation.GetSwitchWinRate(),
                StayWinRate = simulation.GetStayWinRate()
            });
        }
      
    }
}