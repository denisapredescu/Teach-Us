
INSERT INTO IdentityRoles
VALUES
('B5B8D19F-40A8-4EDB-A438-007E0556F2E2',	'student'),
('C6924CD6-B1AA-4DD3-9337-259AFB5A4A28',	'mentor'),
('143067D6-9045-4F7A-83D0-9BEE13A93749',	'admin');



INSERT INTO IdentityUsers
VALUES
('92679149-0886-4FD3-BB04-66FE96E6C77E', NULL, 'Dobre Ianis', 'ianis@yahoo.com', '0742134088', '10000.Qwlva6qPjMfXot9gGLhYig==.6tV8d99pHpiw0nqWW8ARaYqTi2ytw40N5Owjaewidl0=', '2022-12-27 13:18:09.9697935', 1, 0, 'elev clasa a X-a pasionat de sport si matematica', 'L.T.C.B', 'B5B8D19F-40A8-4EDB-A438-007E0556F2E2'), 
-- parola este "parola"
('71855B64-30E2-4227-AFC9-F4521A941E9A', NULL, 'Jeff Smith', 'pat@example1.com', '1234567890', '10000.SMGQ+fVojFnHGr3Z5N2tHw==./H5wLX12FxpdNNQLbvW45HWmZTz/c7YkPBRzxkFD+p8=', '2023-01-16 19:05:57.3224430', 1, 0, 'I am a passionate university student', 'Unibuc', 'C6924CD6-B1AA-4DD3-9337-259AFB5A4A28'),
-- parola este "parola"
('0524DB1E-CC5D-492C-B911-4203CA470128', NULL, 'Steven Johnson', 'pat@example2.com', '0987654321', '10000.ragOVru8wlRhRErf+V1aDQ==.eguRgXK+0Hs3OKWz+Zz/dTODGvGHzklSwrXWginHCLU=',	'2023-01-25 12:38:35.6002786', 1, 0, 'I have 3 years of teaching experience.', 'Politehnica', 'C6924CD6-B1AA-4DD3-9337-259AFB5A4A28'),
-- Parola@1
('FEBEC7ED-D313-4FD1-9148-0E71F36EAE52', NULL, 'admin', 'admin@example.com', '', '10000.SMGQ+fVojFnHGr3Z5N2tHw==./H5wLX12FxpdNNQLbvW45HWmZTz/c7YkPBRzxkFD+p8=', '2023-01-16 19:05:57.3224430', 1, 0, '', '', '143067D6-9045-4F7A-83D0-9BEE13A93749');
-- parola este "parola"

INSERT INTO Adresses
VALUES
('5634A72E-2CF8-4CB0-8D04-9BDC3EDED063',	'Bucuresti',	'Bucuresti',	'Liviu Rebreanu nr 40',	'71855B64-30E2-4227-AFC9-F4521A941E9A'),
('48E65DA7-C950-4B47-BBC4-981DD398AE90',	'Dabuleni',	'Dolj',	'S.V.39',	'92679149-0886-4FD3-BB04-66FE96E6C77E'),
('DEF56906-5578-4DFA-A2B4-C9C4DEEA8048', 'Los Angeles', 'California', '5th Avenue', '0524DB1E-CC5D-492C-B911-4203CA470128');






INSERT INTO Mentors
VALUES
('71855B64-30E2-4227-AFC9-F4521A941E9A',	0x10101010101010,	0x10101010101010),
('0524DB1E-CC5D-492C-B911-4203CA470128', 0x10101010101010, 0x10101010101010);




INSERT INTO Students
VALUES
('92679149-0886-4FD3-BB04-66FE96E6C77E',	12, 'mate info L.G.S.');	



-- INSERT INTO Matches
-- VALUES
-- ('71855B64-30E2-4227-AFC9-F4521A941E9A',	'92679149-0886-4FD3-BB04-66FE96E6C77E',	'2022-12-27 21:56:41.2956587',	'Waiting');



INSERT INTO Reviews
VALUES
('CD439BB8-22C7-4F1A-B69F-A82144F03AAA',	'Meditatiile au decurs peste asteptari',	4,	'71855B64-30E2-4227-AFC9-F4521A941E9A',	'92679149-0886-4FD3-BB04-66FE96E6C77E',	'ReviewMentor');



INSERT INTO [dbo].[Announcements] ([Id], [Subject], [Description], [Price], [MeetingType], [MentorId], [StudentId])
VALUES
(N'48591f13-4d69-4bc1-f258-08dafd9f5300', N'Informatics', N'Algorithm related subjects with emphesis on data structures.', 150, 1, N'71855B64-30E2-4227-AFC9-F4521A941E9A', NULL),
(N'7062158a-3d29-47d9-f259-08dafd9f5300', N'Biology', N'Bacteria de la una o pornim bacteriiaaa apoi doua devenim bacteriaaa si din nou inca doua pana la 99 bacteriaaa ne inmultim neincetat bacteriaaa n-avem timp de asteptat bacteriaaa planul il vom dezvalui bacteriaaa lumea o vom cuceri', 75, 0, N'71855B64-30E2-4227-AFC9-F4521A941E9A', NULL),
(N'e9fc24f8-9d67-437f-f25a-08dafd9f5300', N'French', N'Qu est-ce que vous avez préparé pour aujourd hui?', 90, 0, N'71855B64-30E2-4227-AFC9-F4521A941E9A', NULL),
(N'2d0131ed-66c2-40cf-f25b-08dafd9f5300', N'Mathematics', N'Lessons will be focused on spacial and plane geometry. There will me a small module for intro to trigonometry.', 80, 1, N'71855b64-30e2-4227-afc9-f4521a941e9a', NULL),
(N'03e12217-ae99-4b3e-f25c-08dafd9f5300', N'Romanian', N'Predau romana doar la smecheri.', 65, 0, N'71855B64-30E2-4227-AFC9-F4521A941E9A', NULL),
(N'7535163c-7a28-4983-f25d-08dafd9f5300', N'English', N'A cup of tea and you can have me.', 60, 1, N'0524DB1E-CC5D-492C-B911-4203CA470128', NULL),
(N'fc268b92-4b01-4181-f25e-08dafd9f5300', N'History', N'Lessons can range from ancient civilizations to modern geopolitics.', 55, 0, N'0524DB1E-CC5D-492C-B911-4203CA470128', NULL);
