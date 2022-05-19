const char *power(int moc)
{
    char napis[16] = {
        'm', 'o', 'c', ':',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        moc & 4, moc & 2, moc & 1, 'W'};
    return napis;
}
int main()
{
    printf(power(100));
}
