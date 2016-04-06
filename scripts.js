$(document).ready(function()
{
	getChannels();

	// function to show all, online or offline streams
	$(".toggle").click(function()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		
		if($(this).is("#online"))
		{
			$(".offline").addClass("hidden");
			$(".online").removeClass("hidden");

		}
		else if($(this).is("#offline"))
		{
			$(".online").addClass("hidden");
			$(".offline").removeClass("hidden");
		}
		else
		{
			$(".result").removeClass("hidden");
		}

	});
});

function getChannels()
{
    var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "imaqtpie", "nightblue3", "amazhs", "dreamleague", "summit1g", "gsl"];
	
	for(var c in channels)
	{
		
		$.ajax({
	        type: "GET",
	        url: "https://api.twitch.tv/kraken/streams/" + channels[c] + "?&callback=?",
	        contentType: "application/json; charset=utf-8",
	        async: false,
	        dataType: "json",
	        success: function (data) 
	        {
	        	console.log(data);
	        	
	        	var channel = data._links.channel;
	        	var description;
	        	var logo = "";
	        	var name = "";
                var status;
                var live = "";
	        		if(data.stream !== null)
	        		{
	        			 description = data.stream.channel.status;
	        			 logo = data.stream.channel.logo;
	        			 name = data.stream.channel.name;
	        			 status = 'online';
	        			 live = "live";
	        		}
	        		else if(data.stream === null)
	        		{
                        status = 'offline';
                        description = "Channel Offline";
                        logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0MzxJ5LGAGy-whEdTTtK0IUHX3sUVXuokxUKj0B_If37P3M0";
	        		}
	        		//console.log(status);
                   $("#results").append("<div class='row result " + status + "'><div class='col-md-3 icon'><img src=" + logo + " class='logo'/></div><div class='col-md-3 name'><p>" + name + "</p></div><div class='col-md-3'><p class='status'>" + description + "</p></div><div class='col-md-3'><p class='live'><a href='" + channel + "'>" + live + "</a></p></div></div>");
	        		     
		            			        	        
	 		}

	    	});
	}
};

