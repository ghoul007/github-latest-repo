#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import Util from './utils';


(async () => {
  try {
    let search = 'puppeteer'; // default

    const promptResults = await inquirer.prompt([
      {
        type: 'input',
        name: 'search',
        message: chalk.blue('Enter the GitHub search you want to spy on'),
        default: search
      }
    ]);

    search = promptResults.search ? promptResults.search : search;

    const spinner = ora({
      text: chalk.blue('Loading search'),
      spinner: 'clock'
    });
    spinner.start();

    const searchs = await Util.retrieveRepos(search);
    spinner.succeed(chalk.blue('Done'));


    searchs.forEach(({ title, desc }) => {
      console.log(`${chalk.bold(chalk.blue(`${title}`))} ===> ${chalk.bold(chalk.gray(` ${desc}`))}`);

    });
  } catch (error) {
    console.error(chalk.redBright(error));
    process.exit(1);
  }
})();
