package com.example.demo.caffeine;

import static io.micronaut.security.rules.SecurityRule.IS_AUTHENTICATED;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.security.annotation.Secured;
import io.micronaut.validation.Validated;

@Validated
@Controller("/api/v1/caffeine")
public class CaffeineController {

  private static final Logger sLogger = LoggerFactory.getLogger(CaffeineController.class);

  private static final Random sRand = new Random();

  String getCaffeineLevel() {
    List<String> givenList = Arrays.asList("Head on table asleep. Needs coffee now!", "Not at all. What's wrong?!",
        "Mildly. Boring.", "Making progress.", "Everything is awesome. Stuff is definitely happening.",
        "Eyeballs are rolling around in my head and I'm shouting at my coworker about JHipster.",
        "The LD50 of caffeine is 100 cups. Your developer has had 99 and is talking to the bike rack outside while jogging in place.");

    String caffeineLevelString = givenList.get(sRand.nextInt(givenList.size()));
    return caffeineLevelString;
  }

  @Secured(IS_AUTHENTICATED)
  @Get
  public String getCaffeineLevel(Principal principal) {
    String userName = principal != null ? principal.getName() : "Anonymous";
    sLogger.debug("In getCaffeineLevel using user: {}", userName);
    return userName + ", your developer's caffeine level is: " + getCaffeineLevel();
  }

}
