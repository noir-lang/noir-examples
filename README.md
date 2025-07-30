# Noir Examples

 
This is a reference repo to help you get started with writing zero-knowledge circuits and applications with [Noir](https://noir-lang.org/).

Each project is an example you can use for whatever you want. Feel free to mix them in order to find the best combination of technology that suits your needs.

- Solidity Example: [`./solidity-example`](./solidity-example)
- Recursion: [`./recursion`](./recursion/)

## Starter

You can view simpler, boilerplate projects that are good templates for starting your own Noir project in the [Noir Starter](https://github.com/noir-lang/noir-starter) repo.

## Support

Need help? Join the [Noir Discord](https://discord.gg/JtqzkdeQ6G) or reach out on [X (formerly Twitter)](https://x.com/NoirLang).

## Contributing

We welcome contributions! Check out the [contributing guidelines](./CONTRIBUTING.md) for more info.

## OpenAI Codex

If using [OpenAI Codex](https://chatgpt.com/codex/) add the following to your environment, so that the agents can run `nargo` and `bb` commands.

Make it so that it can run the startup script.

```bash
chmod +x ./scripts/setup-all.sh
./scripts/setup-all.sh
```

And turn on internet access. Giving access to "Common Dependencies" and this specific url should be sufficient, `aztec-ignition.s3.amazonaws.com`.
