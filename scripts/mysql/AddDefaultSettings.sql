TRUNCATE TABLE settings;

INSERT INTO settings (setting, description, default_value)
VALUES ('Google Calendar Address', 'Address for your google calendar' ,'')
      ,('Enable User Requests', 'Enable others to send requests to your list' ,'N')
      ,('User Request Key', 'Key used to privatize your http address (\user\requests?user=USERNAME&key=KEY)' ,'');;

