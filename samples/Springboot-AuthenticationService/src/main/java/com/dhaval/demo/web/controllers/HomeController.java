package com.dhaval.demo.web.controllers;

import com.dhaval.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.Random;

@Controller
public class HomeController {

  @Autowired
  private UserRepository userRepo;

  private Random random = new Random();

  @RequestMapping("/")
  public String home(Model model) throws Exception {
    model.addAttribute("users", userRepo.findAll());

    try {

      if (random.nextInt(10) < 5) {
        //slow request simulation
        Thread.sleep(1000);

        //Throw exception
        throw new Exception("random exception generated");
      }

    }
    catch (IOException ex) {

    }

    return "index";
  }
}
