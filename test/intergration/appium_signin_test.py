import os
from time import sleep

import unittest

from appium import webdriver

# Returns abs path relative to this file and not cwd
PATH = lambda p: os.path.abspath(
    os.path.join(os.path.dirname(__file__), p)
)

class SimpleAndroidTests(unittest.TestCase):
    def setUp(self):
        desired_caps = {}
        desired_caps['platformName'] = 'Android'
        desired_caps['platformVersion'] = '6.0'
        desired_caps['deviceName'] = 'Android Emulator'
        desired_caps['app'] = '/Users/leixu/Apps/ReactTODO/android/app/build/outputs/apk/app-release.apk'

        self.driver = webdriver.Remote('http://0.0.0.0:4723/wd/hub', desired_caps)

    def tearDown(self):
        # end the session
        sleep(5)
        self.driver.quit()

    def test_find_elements(self):
        sleep(5)
        user_input = self.driver.find_element_by_accessibility_id("username-input")
        user_input.click()
        user_input.send_keys('test_account')
        pwd_input = self.driver.find_element_by_accessibility_id("passwd-input")
        pwd_input.click()
        pwd_input.send_keys('123456')
        signin_submit = self.driver.find_element_by_accessibility_id("signin-submit")
        signin_submit.click()


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(SimpleAndroidTests)
    unittest.TextTestRunner(verbosity=2).run(suite)