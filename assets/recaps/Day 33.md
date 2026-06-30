Good things happened today. But also a LOT of bad things happened as well that’s making us stress about reaching our deadline of having the practice robot finished.

# Shooter

- The shooter finally shot with the kicker and twindexer all working together but we found an issue with the handoff from the kicker to the shooter. The compression is different between the two which leads to a weird super compressed section in the transition from kicker to shooter. We think that could lead to some bad shots as the ball will either be going from a high rate of speed to a super compressed part and that compressed part could add some unexpected load to the shooter wheel. We will probably want to play with changing either the shooter compression or the kicker compression to match so that there’s a smooth path. This sadly means adjusting and rebuilding the shooter again.

# Kicker

- So we aren’t exactly sure what the issue is here but the kicker jams pretty bad. We did put PID on the shooter today so we think that could be the problem but it could also be the amount of compression we have on the kicker as well. We can address this quickly by removing PID and see if that solves the problem. If not, we have a couple of other ideas as well to look at.

# Twindexer

- This was one of the bigger let downs today. There seems to be issues with the balls not going into the base of the twindexer freely. It could be the compression between the wheels and the walls or the 3D printed curved bases causing the problems but this issue sort of compounds the kicker issue as balls are being fed into the kicker, thus making the kicker have to work harder to pull balls from the twindexer into the shooter. If the balls are in the twindexer at the start, they go into the kicker smoothly (with a small minor hiccup at the lexan corners) but if not, they struggle to get into the kicker. 

- Also the belt, pulleys and shafts all came off the motors of the twindexer at the end of the meeting, but that isn’t anything super problematic.

# Intake

- We fixed one part of the intake with the bolt rubbing against the motor. For some reason, we didn’t think about the other side which ALSO has the same issue. When trying to run the intake at the end of the meeting, we found that we had the same issue as we had yesterday so we’ll have to fix it the same way tomorrow. Programming is still working on the actuation of the intake and the final REV parts came in so we can work on changing the actuation to just using 1 motor.

# Climber

- The bright spot today was the climber looks to be a big success. We have to adjust some geometry of the mounting (my fault. It should have been mounted 180 as it is in CAD) and creating a new hook. We managed to climb 99% of the way today. 3 of the 4 wheels got off the ground once we fixed the slipping issue we were having at the beginning of testing. We then raised the climbing structure 1 inch and the robot successfully climbed. This means we just need to be able to retract the climber an additional inch to have a solid climb. We started working on the geometry by the end of the meeting so we can fix that tomorrow or Friday.


Overall, today was a good day at identifying issues and problems we wouldn’t be able to see until the robot is together. The bad part is we need to have it finished fully by Friday to meet our deadline and there are still a lot of questions and potential changes needed to achieve this goal. 

![Hopper 1](/assets/images/recap_images/33_1.jpg)
![Hopper 2](/assets/images/recap_images/33_2.jpg)