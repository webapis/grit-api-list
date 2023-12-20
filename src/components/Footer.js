import React from "react";
import { Container, Grid, Link, Typography } from "@mui/material";
const domainname=process.env.domainname
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "lightgrey", // Replace with your desired background color
        padding: "16px 1",
        marginTop:50
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">{domainname}.com</Typography>
            <Typography variant="body2" color="textSecondary" style={{ textAlign: "justify" }}>
              www.{domainname}.com markaların ürünlerini birarada bulmanıza yardımcı olan bir web sitesidir. Web sitesinde
              sevdiğiniz markaların ürünlerini arayabilirsiniz ve markaların kendi web sitelerine alış-veriş için
              yönlendirilebilirsiniz.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Links</Typography>
            <nav>
              <Link
                variant="body2"
                color="textSecondary"
                href="#"
                style={{ margin: "8px 12px" }}
              >
                Ana Sayfa
              </Link>
              <Link
                variant="body2"
                color="textSecondary"
                href="#"
                style={{ margin: "8px 12px" }}
              >
                Hakkımızda
              </Link>
              <Link
                variant="body2"
                color="textSecondary"
                href="#"
                style={{ margin: "8px 12px" }}
              >
                İletişime Geçmek
              </Link>
            </nav>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Sosyal medya</Typography>
            <nav>
              <Link
                variant="body2"
                color="textSecondary"
                href="#"
                style={{ margin: "8px 12px" }}
              >
                Facebook
              </Link>
              <Link
                variant="body2"
                color="textSecondary"
                href="#"
                style={{ margin: "8px 12px" }}
              >
                Twitter
              </Link>
              <Link
                variant="body2"
                color="textSecondary"
                href="#"
                style={{ margin: "8px 12px" }}
              >
                Instagram
              </Link>
            </nav>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Glumzi.com. Her hakkı saklıdır.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
