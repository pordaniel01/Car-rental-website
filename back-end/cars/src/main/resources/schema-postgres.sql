drop table rent;
drop table cars;
drop table users;

CREATE TABLE IF NOT EXISTS cars(car_id INT GENERATED ALWAYS AS IDENTITY,
                                car_name VARCHAR,
                                car_color VARCHAR,
                                image_url VARCHAR,
							    PRIMARY KEY(car_id));
CREATE TABLE IF NOT EXISTS users(user_id INT GENERATED ALWAYS AS IDENTITY,
                                username VARCHAR,
                                user_email VARCHAR,
                                active VARCHAR,
                                password_hash VARCHAR,
                                authority VARCHAR,
								PRIMARY KEY(user_id));
CREATE TABLE IF NOT EXISTS rent(rent_id serial PRIMARY KEY,
                                rent_ts TIMESTAMP,
								fk_user INTEGER,
								fk_car INTEGER);

ALTER TABLE rent
   ADD CONSTRAINT fk_user
   FOREIGN KEY (fk_user)
   REFERENCES users(user_id);
ALTER TABLE rent
   ADD CONSTRAINT fk_car
   FOREIGN KEY (fk_car)
   REFERENCES cars(car_id);

   INSERT INTO public.users(
   	 username, user_email, active, password_hash, authority)
   	VALUES ( 'pd', 'pd', 'true', 'pd', 'ROLE_USER,ROLE_ADMIN');
INSERT INTO public.cars(
	 car_name, car_color, image_url)
	VALUES ( 'toyota', 'sand', 'http://images.gtcarlot.com/pictures/24381066.jpg');
   INSERT INTO public.cars(
      	 car_name, car_color, image_url)
      	VALUES ( 'Renault','Grey','https://www.carscoops.com/wp-content/uploads/2019/05/94b05272-renault-scenic-black-edition-france-14-1024x555.jpg');
