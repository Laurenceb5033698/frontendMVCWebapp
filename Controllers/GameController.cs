using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace mvcIntro.Controllers;

public class GameController : Controller
{    
    public IActionResult Snake()
    {
        return View();
    }
}